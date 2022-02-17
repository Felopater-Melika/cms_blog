import moment from 'moment';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget: React.FC<any> = ({ categories, slug }: any) => {
  const [relatedPosts, setRelatedPosts] = useState([] as any[]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((response) =>
        setRelatedPosts(response)
      );
    } else {
      getRecentPosts().then((response) => setRelatedPosts(response));
    }
  }, [slug]);

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div className="mb-4 flex w-full items-center" key={post.title}>
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              alt={post.title}
              height="60"
              width="60"
              className="rounded-full align-middle"
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-xs text-gray-500">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
