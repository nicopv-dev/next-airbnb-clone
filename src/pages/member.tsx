import HeadComponent from '../components/HeadComponent';

export default function Member() {
  return (
    <>
      <HeadComponent title="Hazte anfitrion - Airbnb" />
      <div className="flex flex-col">
        {/* Main */}
        <div className="w-full h-screen flex">
          <div className="flex-[0.5_1_0%] w-full h-full flex flex-col justify-center items-center bg-black">
            <div className="max-w-lg grid place-items-center gap-10">
              <h1 className="text-white text-6xl font-bold text-center">
                Abre tus puertas como anfitrión
              </h1>
              <button className="text-white bg-primary_dark px-6 py-2 rounded-md">
                Animate a ser anfitrion
              </button>
            </div>
          </div>
          <div className="flex-[0.5_1_0%] w-full h-full">
            <video
              className="w-full h-full object-cover"
              loop={true}
              autoPlay
              muted
              preload={'auto'}
            >
              <source src="/videos/member.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        {/* Content*/}
        <div className="w-full">content</div>
      </div>
    </>
  );
}
