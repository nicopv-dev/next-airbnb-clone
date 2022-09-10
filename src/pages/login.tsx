import HeadComponent from '../components/HeadComponent';

export default function Login() {
  return (
    <>
      <HeadComponent title="Iniciar sesion - Airbnb" />
      <div className="flex h-screen">
        {/* Image */}
        <div className="flex-[0.7_1_0%]">image</div>
        {/* Form */}
        <div className="h-full flex-[0.3_1_0%] flex flex-col justify-center items-center">
          <form className="flex flex-col gap-4">
            <input
              type={'text'}
              placeholder={'Ingrese nombre'}
              className="focus:outline-none"
            />
            <input
              type={'text'}
              placeholder={'Ingrese contraseña'}
              className="focus:outline-none"
            />
          </form>
        </div>
      </div>
    </>
  );
}
