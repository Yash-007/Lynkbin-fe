import { ArrowLeft, Shield, Lock, Eye, Database, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PrivacySecurity = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "data-collection",
      title: "What We Store",
      icon: Database,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      content: [
        {
          question: "Your Data",
          answer: "• Links you save (URLs only)\n• Platform, category, author, and tags\n• Save dates\n"
        },
        {
          question: "What We Don't Store",
          answer: "• Browsing history\n• Private content\n• Links you don't save"
        }
      ]
    },
    {
      id: "data-usage",
      title: "How We Use It",
      icon: Eye,
      color: "text-accent-blue",
      bgColor: "bg-accent-blue/10",
      borderColor: "border-accent-blue/20",
      content: [
        {
          question: "Purpose",
          answer: "We only use your data to:\n• Display your saved links\n• Organize by platform and category\n• Filter by author and tags"
        },
        {
          question: "We Don't",
          answer: "• Sell or share your data\n• Use it for advertising\n• Track you elsewhere"
        }
      ]
    },
    {
      id: "security",
      title: "Security",
      icon: Lock,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      content: [
        {
          question: "Protection",
          answer: "• Your links are private\n• Stored securely\n• Not shared publicly"
        }
      ]
    }
  ];

  const features = [
    { icon: CheckCircle, text: "No ads" },
    { icon: CheckCircle, text: "Private by default" },
    { icon: CheckCircle, text: "Data not sold" },
    { icon: CheckCircle, text: "Simple & transparent" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Privacy & Security</h1>
              <p className="text-xs text-muted-foreground">Your data, your control</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl pb-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-green-500/10 via-primary/5 to-green-500/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 mb-6">
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 via-green-600 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Privacy & Security</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Simple, transparent, and secure. Here's what we do with your data.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <feature.icon className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-6">
            <div className="flex items-center gap-2.5 mb-3">
              <div className={`w-9 h-9 rounded-lg ${section.bgColor} flex items-center justify-center border ${section.borderColor}`}>
                <section.icon className={`w-4 h-4 ${section.color}`} />
              </div>
              <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
            </div>

            <div className="space-y-3">
              {section.content.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-card/50 backdrop-blur-xl rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all"
                >
                  <h3 className="font-semibold text-sm text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Section */}
        <div className="bg-card/50 backdrop-blur-xl rounded-xl p-5 border border-border/50 text-center">
          <p className="text-sm text-muted-foreground mb-3">Questions about privacy?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.href = 'mailto:support@lynkbin.com'}
              className="bg-card/50 border-border/50 hover:bg-card/80"
            >
              Contact Us
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate("/help")}
              className="bg-primary/10 border-primary/30 hover:bg-primary/20 text-primary"
            >
              Help Center
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacySecurity;

