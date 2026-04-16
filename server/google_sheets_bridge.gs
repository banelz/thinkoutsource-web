/**
 * THINK OUTSOURCE - GOOGLE SHEETS BRIDGE v3
 * Handles bi-directional sync, color coding, and automated categorization.
 */

// --- CONFIGURATION ---
var BACKEND_URL = "https://api.thinkoutsource.co.za/api/update_lead";

function doPost(e) {
  // --- SAFETY CHECK ---
  if (!e || !e.postData || !e.postData.contents) {
    var errMessage = "No post data received. Note: You cannot run doPost manually from the script editor.";
    console.error(errMessage);
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": errMessage }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Invalid JSON: " + err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Define base headers and row content
  var baseHeaders = ["Timestamp", "Type", "DB_ID", "Lead Status", "Notes"];
  var baseRow = [new Date(), data.type, data.dbId, "New", ""];
  
  // Collect additional dynamic data keys
  var dynamicKeys = [];
  Object.keys(data).forEach(function(key) {
    if (["type", "dbId", "lead_status", "notes"].indexOf(key) === -1) {
      dynamicKeys.push(key);
    }
  });

  // If sheet is empty, add headers
  if (sheet.getLastRow() === 0) {
    var allHeaders = baseHeaders.concat(dynamicKeys);
    sheet.appendRow(allHeaders);
    // Format header row
    var headerRange = sheet.getRange(1, 1, 1, allHeaders.length);
    headerRange.setFontWeight("bold").setBackground("#f1f5f9").setBorder(true, true, true, true, true, true);
    sheet.setFrozenRows(1);
  }
  
  // Combine all data for the row
  var row = baseRow.concat(dynamicKeys.map(function(key) { return data[key]; }));
  sheet.appendRow(row);
  
  // Apply data validation (dropdown) and formatting
  var lastRow = sheet.getLastRow();
  applyStatusFormatting(sheet, lastRow);

  return ContentService.createTextOutput(JSON.stringify({ "result": "success", "row": lastRow }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Applies dropdown and color coding to a status cell.
 */
function applyStatusFormatting(sheet, rowNum) {
  var range = sheet.getRange(rowNum, 4); // Column D
  var statuses = ['New', 'Qualified', 'Call Later', 'Busy', 'Invalid', 'Closed'];
  
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(statuses, true)
    .build();
  range.setDataValidation(rule);
  
  // Color coding
  var value = range.getValue();
  updateCellColor(range, value);
}

function updateCellColor(range, value) {
  var colors = {
    'New': '#e3f2fd',      // Light Blue
    'Qualified': '#e8f5e9', // Light Green
    'Call Later': '#fff3e0',// Light Orange
    'Busy': '#fce4ec',      // Light Pink
    'Invalid': '#ffebee',   // Light Red
    'Closed': '#f5f5f5'     // Grey
  };
  range.setBackground(colors[value] || null);
}

/**
 * Triggered on every edit.
 */
function onEdit(e) {
  if (!e) return;
  var range = e.range;
  var sheet = range.getSheet();
  var row = range.getRow();
  var col = range.getColumn();
  
  if (row <= 1) return;
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Column 4 is Lead Status
  if (col === 4) {
    var status = range.getValue();
    updateCellColor(range, status);
    
    // Categorization: Move row immediately if status is certain types
    var moveStatuses = ['Call Later', 'Busy', 'Invalid', 'Closed'];
    if (moveStatuses.indexOf(status) > -1) {
      moveRowToSheet(ss, sheet, row, status);
      return; // Stop further processing for this row as it's moved
    }
  }

  // Handle DB Sync for Status (4) and Notes (5)
  if (col === 4 || col === 5) {
    syncToDatabase(sheet, row);
  }
}

/**
 * Moves a row to a destination sheet and deletes it from source.
 */
function moveRowToSheet(ss, sourceSheet, rowNum, targetSheetName) {
  var targetSheet = ss.getSheetByName(targetSheetName) || ss.insertSheet(targetSheetName);
  
  // Add headers if new
  if (targetSheet.getLastRow() === 0) {
    var headers = sourceSheet.getRange(1, 1, 1, sourceSheet.getLastColumn()).getValues();
    targetSheet.getRange(1, 1, 1, headers[0].length).setValues(headers).setFontWeight("bold");
  }
  
  var rowData = sourceSheet.getRange(rowNum, 1, 1, sourceSheet.getLastColumn()).getValues();
  targetSheet.appendRow(rowData[0]);
  
  // Apply formatting to the newly appended row in the target sheet
  applyStatusFormatting(targetSheet, targetSheet.getLastRow());
  
  sourceSheet.deleteRow(rowNum);
}

/**
 * Relay changes back to SQL
 */
function syncToDatabase(sheet, row) {
  var type = sheet.getRange(row, 2).getValue();
  var dbId = sheet.getRange(row, 3).getValue();
  var status = sheet.getRange(row, 4).getValue();
  var notes = sheet.getRange(row, 5).getValue();
  
  if (!dbId || dbId === "") return;
  var cleanId = dbId.toString().split('.')[0]; 

  var payload = { id: cleanId, type: type, status: status, notes: notes };
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    UrlFetchApp.fetch(BACKEND_URL, options);
  } catch (err) {
    console.error("Database Sync Error: " + err.toString());
  }
}

/**
 * Daily Task: Copy Qualified leads to 'Qualified' sheet.
 * Schedule this for 7pm SAST daily.
 */
function copyQualifiedLeads() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheets()[0]; // Assuming first sheet is main
  var targetSheet = ss.getSheetByName("Qualified") || ss.insertSheet("Qualified");
  
  var data = mainSheet.getDataRange().getValues();
  var headers = data[0];
  
  // Add headers if empty
  if (targetSheet.getLastRow() === 0) {
    targetSheet.appendRow(headers);
    targetSheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    targetSheet.setFrozenRows(1);
  }
  
  // Collect existing IDs in target to prevent duplicates
  var existingIds = targetSheet.getDataRange().getValues().map(function(r) { return r[2]; }); // DB_ID is index 2

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var status = row[3]; // Lead Status is index 3
    var dbId = row[2];
    
    if (status === "Qualified" && existingIds.indexOf(dbId) === -1) {
      targetSheet.appendRow(row);
      // Apply formatting to the new copy
      applyStatusFormatting(targetSheet, targetSheet.getLastRow());
    }
  }
}
