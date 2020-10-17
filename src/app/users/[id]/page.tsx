import Image from 'next/image';

interface IProps {
  params: {
    id: string;
  };
}

export default function UserProfilePage({ params: { id } }: IProps) {
  return (
    <section>
      <h1>User Name</h1>
      <Image
        src={'/mememan.webp'}
        width={300}
        height={300}
        alt={`Mememan's profile`}
      />

      <h3>Bio</h3>
      <p>User bio</p>
    </section>
  );
}
