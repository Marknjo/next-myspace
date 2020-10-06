import { notFound } from 'next/navigation';

interface IBlog {
  title: string;
  content: string;
  slug: string;
}

interface IProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<IBlog | null> {
  const res = await fetch('http://localhost:300/content', {
    next: {
      revalidate: 420,
    },
  });
  const data: IBlog[] = await res.json();

  const foundPost = data.find((post) => post.slug === slug);

  if (!foundPost) {
    return null;
  }

  return foundPost;
}

export default async function PostPage({ params }: IProps) {
  const slug = params.slug;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
