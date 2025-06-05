const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

function generateOTPandToken(userData,expire) {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
    alphabets: false,
  });
  // console.log(otp)
  const secretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = expire;
  const token = jwt.sign({ userData, otp }, secretKey, { expiresIn });
  if (!token) {
    return res.status(500).json({ message: "token not generated" });
  }
console.log(otp)
  return { otp, token };
}
module.exports = generateOTPandToken;
