import express from "express";
import mysql from "mysql";
import cors from "cors";

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
  if (err) throw err;
  console.log("Connected to MySQL database!");
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

  let query = `
    INSERT INTO invoice_amount_details_table(
      currency,
      inv_basic_amount,
      inv_tax_amount,
      total_inv_amount,
      advance_paid,
      tcs_applicable,
      net_payable_amount
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      currency,
      invbasicamt,
      invtaxamt,
      totalinvamtincluoftax,
      advancepaid,
      tcsapplicable,
      netpayableamtexcluoftds,
    ],
    (err, results) => {
      if (err) {
        console.error("Error occurred while inserting the data:", err);
        res.status(500).send("Error occurred while inserting the data");
      } else {
        console.log("Data inserted successfully");
        res.status(200).send("Data sent successfully");
      }
    }
  );

  const query1 = `
  INSERT INTO Alternate_Payee_Details  (
    alternate_payee_1,
   alternate_payee_2,
  city,
  street,
  country,
  bank_key_ifsc_code,
  bank_account_number,
  referencesu
  )
  VALUES (?, ?, ?, ?, ?, ?,?,?)
`;

  db.query(
    query1,
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
        res.status(500).send("Error occurred while inserting the data");
      } else {
        console.log("Data inserted successfully");
        res.status(200).send("Data sent successfully to alter nate table 2");
      }
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
    INSERT INTO Alternate_Payee_Details  (
      alternate_payee_1,
     alternate_payee_2,
    city,
    street,
    country,
    bank_key_ifsc_code,
    bank_account_number,
    referencesu
    )
    VALUES (?, ?, ?, ?, ?, ?,?,?)
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
        res.status(500).send("Error occurred while inserting the data");
      } else {
        console.log("Data inserted successfully");
        res.status(200).send("Data sent successfully");
      }
    }
  );
});
