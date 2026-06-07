import bcrypt from 'bcryptjs';

const staff = [
  { username: 'FLERO',   password: 'FLEROweb123' },
  { username: 'STAFF2',  password: 'Staff2pass!' },
  { username: 'STAFF3',  password: 'Staff3pass!' },
  { username: 'STAFF4',  password: 'Staff4pass!' },
  { username: 'STAFF5',  password: 'Staff5pass!' },
];

for (const s of staff) {
  const hash = bcrypt.hashSync(s.password, 10);
  // Immediately verify it works
  const valid = bcrypt.compareSync(s.password, hash);
  console.log(`\n${s.username}`);
  console.log(`HASH=${hash}`);
  console.log(`Self-test: ${valid ? '✅ PASS' : '❌ FAIL'}`);
}