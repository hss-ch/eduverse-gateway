import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Blog
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Latest updates and insights from GuideCampus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-secondary/60 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    {post.date}
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4 mr-2" />
                    {post.author}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">
                    {post.title}
                  </h3>
                  <p className="text-secondary/70 mb-4">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary hover:text-primary/90"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    Read More
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const blogPosts = [
  {
    id: 1,
    title: "The Future of Education Management",
    excerpt: "Discover how AI and automation are transforming educational institutions.",
    date: "March 15, 2024",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: 2,
    title: "Streamlining Administrative Tasks",
    excerpt: "Learn how to reduce administrative burden with modern tools.",
    date: "March 10, 2024",
    author: "Jane Smith",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: 3,
    title: "Enhancing Student Experience",
    excerpt: "Tips for creating a better learning environment through technology.",
    date: "March 5, 2024",
    author: "Mike Johnson",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

export default Blog;