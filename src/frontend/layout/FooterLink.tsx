import { Card, CardContent } from "@/components/ui/card";
import { footerLinksData } from "@/frontend/constant/footerLinkData";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const FooterLink = () => {
  const { id } = useParams<{ id: string }>();
  const linkData = footerLinksData.find((link) => link.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!linkData) {
    return (
      <div className="bg-gray-50 flex h-50 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-red-500">Page not found !</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      {/* Header */}

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-4 pb-12 pt-7 ">
        <div className=" mx-auto ">
          <Card className="shadow-lg pb-0 bg-gradient-to-r from-emerald-800 via-green-900 to-slate-900 border-none">
            <div className="pt-10 ">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4 text-white">
                  {linkData.title}
                </h1>
                <p className="text-white/80 text-lg">
                  Everything you need to know
                </p>
              </div>
            </div>
            <CardContent className="p-8 bg-gray-200 text-black">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: linkData.content }}
                style={{
                  lineHeight: "1.8",
                }}
              />
            </CardContent>
          </Card>

          {/* Related Links Sidebar */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Related Pages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {footerLinksData
                .filter((link) => link.id !== id)
                .slice(0, 4)
                .map((link) => (
                  <Card
                    key={link.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer bg-gray-200 border-none"
                  >
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-black text-lg mb-2">
                        {link.title}
                      </h4>
                      <p className=" text-sm text-black  line-clamp-3">
                        {link.content.replace(/<[^>]*>/g, "").substring(0, 120)}
                        ...
                      </p>
                      <Link
                        to={`/footerLink/${link.id}`}
                        className="inline-block mt-4 text-red-900 hover:text-red-600 hover:font-semibold text-sm font-medium"
                      >
                        Learn More →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLink;
