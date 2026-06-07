const bcrypt = require('bcryptjs');

// Put your 4 real plain-text passwords here
const plainTextPasswords = [
  "FLEROweb123",    // Staff 2
  "ARKtheSCRIPTER3442",          // Staff 3
  "ArshDiscordOwner567",   // Staff 4
  "WerthPasswordXYZ!"         // Staff 5
];

console.log("--- COPY THESE LINES INTO YOUR .env.local --- \n");

plainTextPasswords.forEach((password, index) => {
  // Generate the hash with 10 salt rounds (industry standard)
  const hash = bcrypt.hashSync(password, 10);
  
  // Print it out in the exact format needed for your .env file
  console.log(`STAFF_${index + 2}_HASH="${hash}"`);
});

console.log("\n---------------------------------------------");