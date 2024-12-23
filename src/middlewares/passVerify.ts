import argon2 from "argon2";

async function passVerify(hash: string, pass: string) {
  try {
    return await argon2.verify(hash, pass);
  } catch (error) {
    console.error("Error al validar contraseña", error);
    throw error;
  }
}

export default passVerify;
