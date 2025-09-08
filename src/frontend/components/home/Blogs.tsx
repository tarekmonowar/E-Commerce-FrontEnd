import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/frontend/constant/blogData";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();

  const handleReadMore = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <section className="bg-[#f6f7f9] py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-3xl text-gray-900 mb-4">
            From The Blog
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group  transition-all duration-300 overflow-hidden bg-[#f6f7f9] shadow-none p-0 rounded-sm"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2">
                  <div className="bg-red-400 text-white px-3 py-1 rounded-sm text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toISOString().slice(0, 10)}
                  </div>
                </div>
              </div>

              <CardContent className="p-3 pt-0">
                <h3
                  className="font-semibold text-md mb-3 text-gray-900 line-clamp-2 group-hover:text-gray-800 transition-colors cursor-pointer hover:text-red-400"
                  onClick={() => handleReadMore(post.id)}
                >
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4 text-xs text-black">
                  <span className="flex items-center gap-1 text-[#246b08]">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <span>{post.category}</span>
                </div>

                <button
                  className="text-gray-950 cursor-pointer p-0 h-auto font-medium hover:text-red-500"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read More →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
