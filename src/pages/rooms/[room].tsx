import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import Error from '../../components/Error';
import Room from '../../interfaces/Room';
import MainLayout from '../../layouts/MainLayout';
import { FiHeart, FiShare } from 'react-icons/fi';
import { IoStar } from 'react-icons/io5';
import Feature from '../../components/Member/Feature';
import Book from '../../components/Room/Book';
import Services from '../../components/Room/Services';
import Gallery from '../../components/Room/Gallery';
//import Calendar from '../../components/Room/Calendar';
import dynamic from 'next/dynamic';
const Calendar = dynamic(() => import('../../components/Room/Calendar'), {
  ssr: false,
});

interface IRoomProps {
  room?: Room;
  error?: boolean;
}

interface ISelectedDate {
  date: Date;
  isSelected: boolean;
}

const Room: NextPage = ({ error, room }: IRoomProps) => {
  const [selectedInitialDate, setSelectedInitialDate] = useState<ISelectedDate>(
    {
      date: new Date(),
      isSelected: false,
    }
  );
  const [selectedEndlDate, setSelectedEndDate] = useState<ISelectedDate>({
    date: new Date(),
    isSelected: false,
  });

  const onChangeInitialDate = (date: Date) =>
    setSelectedInitialDate({
      date,
      isSelected: true,
    });

  const onChangeEndDate = (date: Date) => {
    setSelectedEndDate({
      date,
      isSelected: true,
    });
  };

  return (
    <MainLayout title={`${error ? 'Error' : room?.title} - Airbnb`}>
      {error ? (
        <Error title="Room no encontrada" />
      ) : (
        <div className="min-h-screen py-14 sm:py-20 px-4 sm:px-10 md:px-20 lg:px-24">
          {/* header */}
          <div className="py-8">
            <h1 className="text-2xl font-semibold">{room?.title}</h1>
            <div className="flex justify-between flex-col items-start md:flex-row md:items-center space-y-2 md:space-y-0">
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <IoStar />
                  <p className="text-sm">4.87</p>
                </div>
                <span className="text-sm">389 reseñas</span>
                <p className="text-sm underline">{room?.address}</p>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm">
                  <FiShare className="h-4 w-4" />
                  Compartir
                </button>
                <button className="flex items-center gap-1 text-sm">
                  <FiHeart className="h-4 w-4" />
                  Guardar
                </button>
              </div>
            </div>
          </div>

          {/* gallery */}
          <Gallery images={room?.images} />

          {/* info */}
          <div className="my-8">
            <div className="block xl:flex gap-10">
              {/* left */}
              <div className="flex-1 xl:flex-[0.7_1_0%] mr-0 md:mr-10 space-y-10">
                {/* user description */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-medium text-2xl">
                      Anfitrion: {room?.author?.name}
                    </h1>
                    <p>2 huéspedes1 habitación1 cama1 baño</p>
                  </div>
                  {/* user image */}
                  <div>
                    <Image
                      alt="user image"
                      src="https://a0.muscache.com/im/pictures/user/22630b23-75df-4bf5-ac66-0a9f335c3fa7.jpg"
                      width={50}
                      height={50}
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* features */}
                <div className="space-y-4">
                  <Feature
                    title="Alina tiene la categoría de Superanfitrión"
                    description="Los Superanfitriones tienen mucha experiencia, cuentan con
                      valoraciones excelentes y se esfuerzan al máximo para
                      ofrecerles a los huéspedes estadías maravillosas."
                  />
                  <Feature
                    title="Alina tiene la categoría de Superanfitrión"
                    description="Los Superanfitriones tienen mucha experiencia, cuentan con
                      valoraciones excelentes y se esfuerzan al máximo para
                      ofrecerles a los huéspedes estadías maravillosas."
                  />
                  <Feature
                    title="Alina tiene la categoría de Superanfitrión"
                    description="Los Superanfitriones tienen mucha experiencia, cuentan con
                      valoraciones excelentes y se esfuerzan al máximo para
                      ofrecerles a los huéspedes estadías maravillosas."
                  />
                </div>

                {/* calendar */}
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-semibold">
                    Selecciona el rango de fechas
                  </h1>
                  <div className="flex flex-col lg:flex-row items-center justify-between xl:justify-evenly gap-4">
                    <Calendar
                      selectedDate={selectedInitialDate}
                      onChange={onChangeInitialDate}
                    />
                    <Calendar
                      selectedDate={selectedEndlDate}
                      onChange={onChangeEndDate}
                    />
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="flex-1 xl:flex-[0.3_1_0%] flex justify-center md:block">
                <Book
                  price={room?.price}
                  initialDate={selectedInitialDate?.date}
                  endDate={selectedEndlDate?.date}
                />
              </div>
            </div>

            <Services />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { room: id } = ctx.query;
  const prisma = new PrismaClient();

  const result = await prisma.room.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      images: {
        select: {
          image: true,
        },
      },
      services: {
        select: {
          service: true,
        },
      },
      author: true,
      pais: true,
    },
  });

  if (!result) {
    ctx.res.statusCode = 404;
    return {
      props: {
        error: true,
      },
    };
  }

  return {
    props: {
      room: JSON.parse(JSON.stringify(result)),
      error: false,
    },
  };
};

export default Room;
