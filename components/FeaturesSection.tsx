import { Users, BookOpen, Calendar, FileText, Shield, Settings } from 'lucide-react';
import type { FeatureItem } from '@/types';

const features: FeatureItem[] = [
  {
    icon: Users,
    title: 'Student Management',
    description: 'Comprehensive student profiles, attendance tracking, and academic records.'
  },
  {
    icon: BookOpen,
    title: 'Class Management',
    description: 'Organize classes, assign teachers, and manage schedules efficiently.'
  },
  {
    icon: Calendar,
    title: 'Event Calendar',
    description: 'Schedule and manage school events, holidays, and important dates.'
  },
  {
    icon: FileText,
    title: 'Report Generation',
    description: 'Generate detailed reports for students, classes, and school performance.'
  },
  {
    icon: Shield,
    title: 'Secure Access',
    description: 'Role-based access control to protect sensitive student information.'
  },
  {
    icon: Settings,
    title: 'Easy Configuration',
    description: 'Customize settings to match your school requirements and policies.'
  }
];

export default function FeaturesSection(){
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your School
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools necessary for efficient school administration 
            and student management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}