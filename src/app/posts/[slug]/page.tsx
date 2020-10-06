import { notFound } from 'next/navigation';

interface IBlog {
  title: string;
  content: string;
  slug: string;
}

interface IProps {
  params: { slug: string };
}

async function getPost(slug: string): IBlog | null {}

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
