'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '../../config/site.config';

export function FaleConoscoPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: 'Dúvida Geral',
    mensagem: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) return;
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: 'Fale Conosco', url: '/fale-conosco/' }]} />

      <header className="mb-10 pb-4 border-b-2 border-gray-100">
        <span className="text-xs font-bold text-[#3dc17a] uppercase tracking-wider block mb-1">
          Canais de Atendimento ao Cidadão
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175057]">
          Fale Conosco
        </h1>
        <p className="text-sm text-gray-600 mt-1 max-w-3xl">
          Entre em contato com a Câmara Municipal de Paraíso do Tocantins. Estamos à disposição para atender solicitações, tirar dúvidas e receber sugestões da comunidade.
        </p>
      </header>

      {/* Grid de Canais de Contato */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs hover:border-[#3dc17a] transition-colors flex flex-col">
          <div className="w-12 h-12 rounded-lg bg-[#d7ebee] text-[#175057] flex items-center justify-center mb-4">
            <Phone size={22} />
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1">Telefone Oficial</h2>
          <p className="text-sm text-gray-600 mb-2">Central telefônica e gabinete</p>
          <p className="text-sm font-semibold text-[#175057] mt-auto">
            <a href={`tel:${siteConfig.contact.phone}`} className="hover:underline">
              {siteConfig.contact.phone}
            </a>
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs hover:border-[#3dc17a] transition-colors flex flex-col">
          <div className="w-12 h-12 rounded-lg bg-[#d7ebee] text-[#175057] flex items-center justify-center mb-4">
            <Mail size={22} />
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1">E-mail Institucional</h2>
          <p className="text-sm text-gray-600 mb-2">Comunicação e protocolo eletrônico</p>
          <p className="text-sm font-semibold text-[#175057] mt-auto break-all">
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs hover:border-[#3dc17a] transition-colors flex flex-col">
          <div className="w-12 h-12 rounded-lg bg-[#d7ebee] text-[#175057] flex items-center justify-center mb-4">
            <Clock size={22} />
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1">Horário de Atendimento</h2>
          <p className="text-sm text-gray-600 mb-2">Segunda a Sexta-feira</p>
          <p className="text-sm font-semibold text-[#175057] mt-auto">
            {siteConfig.contact.hours}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs hover:border-[#3dc17a] transition-colors flex flex-col">
          <div className="w-12 h-12 rounded-lg bg-[#d7ebee] text-[#175057] flex items-center justify-center mb-4">
            <MapPin size={22} />
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1">Endereço Presencial</h2>
          <p className="text-sm text-gray-600 mb-2">Palácio Legislativo</p>
          <p className="text-xs font-semibold text-[#175057] mt-auto">
            {siteConfig.contact.address} — Centro, {siteConfig.contact.city} / TO
          </p>
        </div>
      </div>

      {/* Seção Principal: Formulário + Canais Especiais (Ouvidoria / e-SIC) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Formulário */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-[#175057] mb-2 flex items-center gap-2">
            <MessageSquare size={20} className="text-[#3dc17a]" />
            <span>Envie sua Mensagem</span>
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Preencha os campos abaixo para encaminhar sua manifestação à equipe administrativa da Câmara.
          </p>

          {formSubmitted ? (
            <div className="bg-[#dff2e6] border border-[#3dc17a] rounded-lg p-6 text-center">
              <CheckCircle size={44} className="text-[#3dc17a] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#175057] mb-2">Mensagem Registrada com Sucesso!</h3>
              <p className="text-sm text-gray-700 max-w-md mx-auto mb-4">
                Obrigado pelo contato. Sua manifestação foi recebida pelo protocolo da Câmara e será respondida pelo setor competente.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ nome: '', email: '', telefone: '', assunto: 'Dúvida Geral', mensagem: '' });
                }}
                className="px-4 py-2 bg-[#175057] text-white text-xs font-bold rounded-md hover:bg-[#206870] transition-colors"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Seu nome completo"
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#206870] focus:border-transparent text-gray-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    E-mail de Contato *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#206870] focus:border-transparent text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Telefone / Celular
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    placeholder="(63) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#206870] focus:border-transparent text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Assunto
                </label>
                <select
                  value={formData.assunto}
                  onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#206870] focus:border-transparent text-gray-800 bg-white"
                >
                  <option value="Dúvida Geral">Dúvida Geral</option>
                  <option value="Assessoria de Comunicação">Assessoria de Comunicação</option>
                  <option value="Gabinete da Presidência">Gabinete da Presidência</option>
                  <option value="Secretaria Geral">Secretaria Geral</option>
                  <option value="Sugestão de Projeto">Sugestão de Projeto</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Mensagem *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  placeholder="Escreva sua mensagem com detalhes..."
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#206870] focus:border-transparent text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#175057] hover:bg-[#206870] text-white font-bold text-sm rounded-md shadow-xs transition-colors"
              >
                <Send size={16} />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          )}
        </div>

        {/* Canais Oficiais de Lei de Acesso e Ouvidoria */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-linear-to-br from-[#175057] to-[#206870] text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-2 text-[#3dc17a] font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck size={16} />
              <span>Canais Normativos</span>
            </div>
            <h3 className="text-xl font-extrabold mb-3">Ouvidoria & e-SIC</h3>
            <p className="text-sm text-white/90 leading-relaxed mb-6">
              Para solicitações com base na Lei de Acesso à Informação (LAI - Lei 12.527/2011), denúncias, reclamações ou elogios formais, utilize os canais auditáveis do Portal da Transparência:
            </p>

            <div className="space-y-3">
              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/ouvidoria/inicio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-sm font-bold"
              >
                <span>Ouvidoria Geral do Legislativo</span>
                <ExternalLink size={16} className="text-[#3dc17a]" />
              </a>

              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/informacao/sic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-sm font-bold"
              >
                <span>Serviço de Informação ao Cidadão (e-SIC)</span>
                <ExternalLink size={16} className="text-[#3dc17a]" />
              </a>

              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/ouvidoria/perguntas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-sm font-bold"
              >
                <span>Perguntas Frequentes (FAQ)</span>
                <ExternalLink size={16} className="text-[#3dc17a]" />
              </a>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-sm">
            <h4 className="font-bold text-gray-900 mb-2">Atendimento Presencial</h4>
            <p className="text-gray-600 leading-relaxed mb-3">
              O cidadão pode comparecer à sede do Poder Legislativo durante o horário de expediente para protocolar requerimentos ou agendar audiência com vereadores.
            </p>
            <p className="text-xs text-gray-500">
              * Para entrar no plenário ou gabinetes, é recomendável apresentar documento de identificação com foto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
