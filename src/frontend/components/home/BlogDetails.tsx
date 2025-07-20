import BlogSidebar from "@/frontend/components/utils/BlogSidebar";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/frontend/constant/blogData";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="mt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Blog Post Not Found !
          </h1>
          <Button
            onClick={() => navigate(-1)}
            className="rounded-sm bg-red-700 hover:bg-red-800 cursor-pointer text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7f9] pt-5">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-[1300px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Button
                onClick={() => navigate(-1)}
                className="rounded-sm bg-[#246b08] hover:bg-[#236209] cursor-pointer text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="prose prose-lg max-w-none">
                <div className="mb-6">
                  <span className="bg-gray-200 px-2 text-[#246b08] py-1 rounded-sm text-sm font-medium">
                    {post.category}
                  </span>
                </div>

                <div className="leading-relaxed whitespace-pre-line text-gray-700">
                  {post.content}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BlogSidebar currentBlogId={post.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
