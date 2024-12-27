import Image from "../../../node_modules/next/image";
import Overlay from "../../components/Overlay";
import { login } from "@/actions/auth.actions";

export default function Login() {


  // FORGOT PASSWORD MODAL
  // const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  // const handleForgotPasswordClick = () => {
  //   setShowForgotPasswordModal(true);
  // };
  // const closeForgotModal = () => {
  //   setShowForgotPasswordModal(false);
  // };
  // const forgotPasswordModalTitle = "¿Olvidaste tu contraseña?";
  // const forgotPasswordModalBody =
  //   "Ponte contacto con el administrador para restablecer tu contraseña.";

  // WRONG PASSWORD MODAL
  // const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);
  // const openWrongPasswordModal = () => {
  //   setShowWrongPasswordModal(true);
  // };
  // const closeWronPasswordModal = () => {
  //   setShowWrongPasswordModal(false);
  // };
  // const wrongPasswordModalTitle = "Error al iniciar sesión";

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="/logoMini.png"
            alt="Jyotir"
            width={150}
            height={150}
            priority
            className="mx-auto h-25 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ingresa a tu cuenta
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  <a
                    // onClick={handleForgotPasswordClick}
                    className="font-semibold text-blue-700 hover:text-blue-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  // value={password}
                  // onChange={(e) => {
                  //   setPassword(e.target.value);
                  // }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
        {/* <Overlay
          open={showForgotPasswordModal}
          onClose={closeForgotModal}
          title={forgotPasswordModalTitle}
          body={forgotPasswordModalBody}
        />
        <Overlay
          open={showWrongPasswordModal}
          onClose={closeWronPasswordModal}
          title={wrongPasswordModalTitle}
          body={loginError}
        /> */}
      </div>
    </>
  );
}
