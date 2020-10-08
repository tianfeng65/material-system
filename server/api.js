const express = require('express');
const router = express.Router();

const DBHelper = require('./utils/DBHelper');
const conn = new DBHelper().getConn();

// 查询数据
router.post('/search', (req, res) => {
    const {name, supplier} = req.body
    let sqlStr = name 
        ? `select * from ${supplier} where 品名 like '%${name}%'` 
        : `select * from ${supplier}`
    console.log(sqlStr)
    conn.query(sqlStr, (err, result) => {
        if (err) {
            return err
        } else {
            return res.json({tableData: result})
        }
    });
});
// 查询所有表名
router.get('/suppliers', (req, res) => {
    let sqlStr = "select table_name from information_schema.tables where table_schema='test'"
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            suppliers = result.map(item => item.TABLE_NAME)
            return res.json(suppliers)
        }
    });
})

module.exports = router;