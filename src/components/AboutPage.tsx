import { Leaf, Users, Award, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Parampara Eats</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Your trusted partner in organic, sustainable, and healthy living since 2020
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Parampara Eats was founded with a simple mission: to make organic, fresh, and
              locally-sourced food accessible to everyone. We believe that good food shouldn't
              be a luxury, but a right.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We work directly with local farmers and producers who share our commitment to
              sustainable farming practices and quality. Every product we offer is carefully
              selected and tested to ensure it meets our high standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center border-none shadow-md">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">100% Organic</h3>
                <p className="text-sm text-muted-foreground">
                  All products certified organic
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Local Farmers</h3>
                <p className="text-sm text-muted-foreground">
                  Supporting local communities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  Rigorous quality standards
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Customer Love</h3>
                <p className="text-sm text-muted-foreground">
                  10,000+ happy customers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to protecting our planet through sustainable farming
                  practices and eco-friendly packaging.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe you have the right to know where your food comes from and
                  how it's grown.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We support local farmers and communities, creating lasting partnerships
                  built on trust and respect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
