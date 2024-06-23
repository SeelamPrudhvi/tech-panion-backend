const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3006;
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`server is running on port no ${port}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Prudhvi#12345",
  database: "tech_panion",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

app.post("/api/formdata", (req, res) => {
  console.log(req.body);

  const {
    currency,
    invbasicamt,
    invtaxamt,
    totalinvamtincluoftax,
    advancepaid,
    tcsapplicable,
    netpayableamtexcluoftds,

    // second table details below
    alternatePayee1,
    alternatePayee2,
    city,
    street,
    country,
    bankKeyIfscCode,
    bankaccountnumber,
    referencesu,
  } = req.body;

  const query1 = `
    INSERT INTO invoice_amount_details_table (
      currency,
      inv_basic_amount,
      inv_tax_amount,
      total_inv_amount,
      advance_paid,
      tcs_applicable,
      net_payable_amount
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const query2 = `
    INSERT INTO Alternate_Payee_Details (
      alternate_payee_1,
      alternate_payee_2,
      city,
      street,
      country,
      bank_key_ifsc_code,
      bank_account_number,
      referencesu
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query1,
    [
      currency,
      invbasicamt,
      invtaxamt,
      totalinvamtincluoftax,
      advancepaid,
      tcsapplicable,
      netpayableamtexcluoftds,
    ],
    (err1, results1) => {
      if (err1) {
        console.error(
          "Error occurred while inserting into invoice_amount_details_table:",
          err1
        );
        return res
          .status(500)
          .send(
            "Error occurred while inserting the data into invoice_amount_details_table"
          );
      }

      db.query(
        query2,
        [
          alternatePayee1,
          alternatePayee2,
          city,
          street,
          country,
          bankKeyIfscCode,
          bankaccountnumber,
          referencesu,
        ],
        (err2, results2) => {
          if (err2) {
            console.error(
              "Error occurred while inserting into Alternate_Payee_Details:",
              err2
            );
            return res
              .status(500)
              .send(
                "Error occurred while inserting the data into Alternate_Payee_Details"
              );
          }

          console.log("Data inserted successfully into both tables");
          res.status(200).send("Data inserted successfully into both tables");
        }
      );
    }
  );
});

app.post("/api/alternatedetails", (req, res) => {
  console.log(req.body);

  const {
    alternatePayee1,
    alternatePayee2,
    city,
    street,
    country,
    bankKeyIfscCode,
    bankaccountnumber,
    referencesu,
  } = req.body;

  const query = `
    INSERT INTO Alternate_Payee_Details (
      alternate_payee_1,
      alternate_payee_2,
      city,
      street,
      country,
      bank_key_ifsc_code,
      bank_account_number,
      referencesu
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      alternatePayee1,
      alternatePayee2,
      city,
      street,
      country,
      bankKeyIfscCode,
      bankaccountnumber,
      referencesu,
    ],
    (err, results) => {
      if (err) {
        console.error("Error occurred while inserting the data:", err);
        return res.status(500).send("Error occurred while inserting the data");
      } else {
        console.log("Data inserted successfully");
        res.status(200).send("Data sent successfully");
      }
    }
  );
});
