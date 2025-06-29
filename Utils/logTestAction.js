// logTestAction.js
const db = require('./dbClient');

async function logTestRun({ testName, username, status }) {
  try {
    const result = await db.query(
      'INSERT INTO test_runs (test_name, username, status) VALUES ($1, $2, $3) RETURNING id',
      [testName, username, status]
    );
    console.log('✅ Test run logged');
    return result.rows[0].id;
  } catch (err) {
    console.error('❌ Failed to log test run:', err.message);
    return null;
  }
}

async function logAction(testRunId, actionType, element, value) {
  if (!testRunId) return;
  try {
    await db.query(
      'INSERT INTO test_actions (test_run_id, action_type, element, value) VALUES ($1, $2, $3, $4)',
      [testRunId, actionType, element, value]
    );
    console.log(`✅ Action logged: ${actionType}`);
  } catch (err) {
    console.error('❌ Failed to log action:', err.message);
  }
}

module.exports = { logTestRun, logAction };
