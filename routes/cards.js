var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hearthstone"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

/**
 * @GET method: Gets all cards in the database
 */
router.get('/', function(req, res, next) {
    getCards(function (error, cardResult) {
        var results = cardResult;
        var result = "{\"cards\": {";
        for (i = 0; i < results.length - 1; i++) {
            result += "\"" + i + "\":" + JSON.stringify(results[i]) + ",";
        }
        result += "\"" + i + "\":" + JSON.stringify(results[results.length - 1]) + "}}";
        console.log(result);
        res.send(JSON.stringify(cardResult));
    });
});

/**
 * @POST method: Gets cards depending on the parameters passed to the function
 * Possible parameters: 'playerClass', 'cost', 'search'
 */
router.post('/', function (req, res, next) {
    getCardsWithPredicate(req, function(error, cardResult) {
        res.send({'Status':'OK', 'result': cardResult})
    });
});

module.exports = router;

/**
 * Simple request to fetch all cards in the database
 * @param callback
 */
function getCards(callback) {
    con.query('SELECT * FROM Card', function (error, rows) {
        callback(error, rows);
    });
}


/**
 * Function called when a POST request is received.
 * Manages cases with playerClass, cost, and search
 * Handles the different values, and the fact that all columns in the database are TEXT
 * @param req
 * @param callback
 */
function getCardsWithPredicate(req, callback) {
    let i;
    let hasPredicate = false;
    let sql = 'SELECT * FROM Card';
    const predicate = [];
    if (req.body.playerClass != null) {
        hasPredicate = true;
        // 'classes' is an array of length 1+
        let classes = req.body.playerClass;
        console.log(classes);
        if (classes.length === 1) predicate.push('(playerClass = \'' + req.body.playerClass + '\')');
        else {
            let stringBuilder = "(playerClass IN (";
            for (i = 0; i < classes.length - 1; i++) {
                stringBuilder += '\'' + classes[i] + '\',';
            }
            stringBuilder += '\'' + classes[i] + '\'))';
            predicate.push(stringBuilder);
        }
    }

    if (req.body.cost != null) {
        hasPredicate = true;
        if (req.body.cost === '7+')  predicate.push('(cost IN (\'7\',\'8\',\'9\',\'10\',\'11\',\'12\'))');
        else predicate.push('(cost = \'' + req.body.cost + '\')');

    }

    if (req.body.search != null) {
        hasPredicate = true;
        predicate.push('(name LIKE \'%' + req.body.search + '%\' OR description LIKE \'%' + req.body.search + '%\')')
    }

    if (hasPredicate) {
        sql += " WHERE ";
        for (i = 0; i < predicate.length; i++) {
            if (i === 0) sql += predicate[i];
            else sql += " AND " + predicate[i];
        }
    }
    sql += ';';
    console.log(sql);
    con.query(sql, function (error, rows) {
        callback(error, rows);
    })
}
