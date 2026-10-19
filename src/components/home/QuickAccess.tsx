import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Info,
  BookOpen,
  Calendar,
  MessageSquare,
  Video,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '../../config/site.config';

const iconMap: Record<string, React.ReactNode> = {
  'file-text': <FileText size={28} className="text-[#206870]" />,
  info: <Info size={28} className="text-[#206870]" />,
  book: <BookOpen size={28} className="text-[#206870]" />,
  calendar: <Calendar size={28} className="text-[#206870]" />,
  'message-circle': <MessageSquare size={28} className="text-[#206870]" />,
  video: <Video size={28} className="text-[#206870]" />,
};

export function QuickAccess() {
  return (
    <section className="wp-block-araguaia-quick-access my-10 max-w-7xl mx-auto px-4" aria-labelledby="quick-access-title">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-100 pb-3">
        <div>
          <h2 id="quick-access-title" className="text-2xl font-extrabold text-[#175057]">
            Serviços mais acessados
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Acesse diretamente os serviços institucionais e canais de atendimento ao cidadão
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {siteConfig.quickAccess.map((item, index) => {
          const icon = iconMap[item.icon] || <FileText size={28} className="text-[#206870]" />;

          const cardContent = (
            <div className="flex flex-col items-center text-center p-4 h-full bg-white rounded-lg border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#3dc17a] hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="w-14 h-14 rounded-full bg-[#d7ebee] group-hover:bg-[#dff2e6] flex items-center justify-center mb-3 transition-colors">
                {icon}
              </div>
              <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#175057] transition-colors leading-tight mb-1">
                {item.title}
              </h3>
              {item.isExternal && (
                <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-auto pt-2">
                  <span>Portal externo</span>
                  <ExternalLink size={10} />
                </span>
              )}
            </div>
          );

          return item.isExternal ? (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {cardContent}
            </a>
          ) : (
            <Link key={index} href={item.link} className="block">
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
