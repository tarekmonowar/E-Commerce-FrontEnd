import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/frontend/constant/blogData";
import React from "react";
import { useNavigate } from "react-router-dom";

interface BlogSidebarProps {
  currentBlogId: string;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ currentBlogId }) => {
  const navigate = useNavigate();

  const relatedPosts = blogPosts.filter((post) => post.id !== currentBlogId);

  const handlePostClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Related Articles</h3>

      {relatedPosts.map((post) => (
        <Card
          key={post.id}
          className="cursor-pointer hover:shadow-md transition-shadow duration-200 bg-white p-0 rounded-sm"
          onClick={() => handlePostClick(post.id)}
        >
          <CardContent className="p-4">
            <div className="flex gap-3">
              <img
                src={post.image}
                alt={post.title}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-4 hover:text-red-500 transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#28740d]">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogSidebar;
