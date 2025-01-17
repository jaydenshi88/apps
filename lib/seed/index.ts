//@ts-nocheck
"use server";
import { createPartner } from "../api/partners/mutations";
import { NewPartner, NewPartnerParams, Partner } from "../db/schema/partners";

// Mock function to demonstrate structure - replace with your actual DB insertion logic
const insertIntoDatabase = async (data: NewPartner) => {
  console.log(`Inserting: ${JSON.stringify(data)}`);
  // Your database insertion logic goes here
};

const orgTypes = [
  "Sole Proprietorship",
  "Partnership",
  "Corporate",
  "Limited Liability Company (LLC)",
  "Cooperative",
  "NPO",
  "S Corporation",
  "Government",
  "Educational",
];

const parseAndPrepareDataForDB = async () => {
  const filePath = "../../../fake_partners_data_no_id.json";
  try {
    // Read the JSON file
    // Parse the JSON data into an array of objects
    const partners: NewPartnerParams[] = [
      { name: "Jimenez-Gutierrez", isVerified: true, orgType: "Government" },
      { name: "Murray-Murphy", isVerified: true, orgType: "Government" },
      { name: "Anderson LLC", isVerified: true, orgType: "NPO" },
      { name: "Daniels-Baldwin", isVerified: false, orgType: "Corporate" },
      { name: "Hall LLC", isVerified: false, orgType: "NPO" },
      {
        name: "Anderson, Allen and Sexton",
        isVerified: false,
        orgType: "Government",
      },
      { name: "Suarez-Newman", isVerified: true, orgType: "Corporate" },
      { name: "Ray PLC", isVerified: true, orgType: "Educational" },
      { name: "Richard Inc", isVerified: true, orgType: "Educational" },
      { name: "Moreno Inc", isVerified: true, orgType: "Government" },
      { name: "Mckinney-Lee", isVerified: true, orgType: "Educational" },
      {
        name: "Rodgers, Hill and Jones",
        isVerified: true,
        orgType: "Educational",
      },
      { name: "Tran-Clark", isVerified: false, orgType: "NPO" },
      { name: "Perry PLC", isVerified: true, orgType: "NPO" },
      { name: "Craig and Sons", isVerified: true, orgType: "Corporate" },
      { name: "Williams-Edwards", isVerified: false, orgType: "Government" },
      {
        name: "Robertson, Price and Martinez",
        isVerified: true,
        orgType: "Corporate",
      },
      { name: "Evans-Hudson", isVerified: true, orgType: "Corporate" },
      {
        name: "Thomas, King and Williams",
        isVerified: true,
        orgType: "Educational",
      },
      {
        name: "Oliver, Blankenship and Harris",
        isVerified: false,
        orgType: "Government",
      },
      { name: "Smith-Ross", isVerified: false, orgType: "NPO" },
      { name: "Lambert-Smith", isVerified: true, orgType: "Government" },
      {
        name: "Gonzalez, Hopkins and Velez",
        isVerified: true,
        orgType: "Educational",
      },
      { name: "Torres-Richardson", isVerified: false, orgType: "NPO" },
    ];

    // Iterate over each partner object and prepare it for insertion
    for (const partner of partners) {
      // Assuming you have some validation or transformation logic here
      // For demonstration, we directly pass the partner object
      insertIntoDatabase(partner);
      await createPartner(partner);
    }

    console.log("All partners have been processed.");
  } catch (error) {
    console.error("Failed to parse and prepare data for DB:", error);
  }
};

export default parseAndPrepareDataForDB;
