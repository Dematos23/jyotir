import argon2 from "argon2";

async function passHash(pass: string) {
  try {
    const hash = await argon2.hash(pass);
    return hash;
  } catch (error) {
    console.error("Error al hashear la contraseña:", error);
    throw error;
  }
}

export default passHash;
