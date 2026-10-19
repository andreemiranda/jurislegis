'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Plus, Minus, RotateCcw, FileText, Compass, X } from 'lucide-react';

export function AccessibilitySidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontLevel, setFontLevel] = useState(0); // -1, 0, 1, 2, 3

  useEffect(() => {
    // Carrega preferências salvas
    const savedContrast = localStorage.getItem('araguaia_alto_contraste') === 'true';
    const savedFont = parseInt(localStorage.getItem('araguaia_font_level') || '0', 10);

    if (savedContrast) {
      setIsHighContrast(true);
      document.body.classList.add('alto_contraste');
    }

    if (savedFont !== 0) {
      setFontLevel(savedFont);
      applyFontClass(savedFont);
    }
  }, []);

  const toggleContrast = () => {
    const nextVal = !isHighContrast;
    setIsHighContrast(nextVal);
    localStorage.setItem('araguaia_alto_contraste', String(nextVal));
    if (nextVal) {
      document.body.classList.add('alto_contraste');
    } else {
      document.body.classList.remove('alto_contraste');
    }
  };

  const applyFontClass = (level: number) => {
    document.body.classList.remove('font-size-minus-1', 'font-size-plus-1', 'font-size-plus-2', 'font-size-plus-3');
    if (level === -1) document.body.classList.add('font-size-minus-1');
    if (level === 1) document.body.classList.add('font-size-plus-1');
    if (level === 2) document.body.classList.add('font-size-plus-2');
    if (level === 3) document.body.classList.add('font-size-plus-3');
  };

  const increaseFont = () => {
    if (fontLevel < 3) {
      const next = fontLevel + 1;
      setFontLevel(next);
      localStorage.setItem('araguaia_font_level', String(next));
      applyFontClass(next);
    }
  };

  const decreaseFont = () => {
    if (fontLevel > -1) {
      const next = fontLevel - 1;
      setFontLevel(next);
      localStorage.setItem('araguaia_font_level', String(next));
      applyFontClass(next);
    }
  };

  const resetFont = () => {
    setFontLevel(0);
    localStorage.setItem('araguaia_font_level', '0');
    applyFontClass(0);
  };

  return (
    <aside
      aria-label="Opções de Acessibilidade"
      className={`wp-block-araguaia-accessibility ${isOpen ? 'show' : ''}`}
      style={{ left: isOpen ? 'calc(100% - 280px)' : '100%' }}
    >
      {/* Botão de aba lateral */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="wrapper-accessibility"
        aria-label={isOpen ? 'Fechar painel de acessibilidade' : 'Abrir painel de acessibilidade'}
        aria-expanded={isOpen}
      >
        <div className="icon">
          <Eye size={24} />
        </div>
        <div className="text-wrapper">
          <span style={{ fontSize: '13px', fontWeight: 700, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Acessibilidade
          </span>
        </div>
      </button>

      {/* Painel popup deslizante */}
      <div className="popup-accessibility">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-800 dark:text-white">Opções de Acessibilidade</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 p-1"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="popup-accessibility-wrapper">
          <div className="links-wrapper">
            {/* Toggle Alto Contraste */}
            <div
              className="link-wrapper toggle"
              onClick={toggleContrast}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleContrast()}
              aria-pressed={isHighContrast}
            >
              <span className="text-sm font-semibold">Alto Contraste</span>
              <input
                type="checkbox"
                checked={isHighContrast}
                onChange={toggleContrast}
                className="toggle-checkbox"
                aria-label="Alternar Alto Contraste"
              />
              <span className="toggle-switch"></span>
            </div>

            {/* Aumentar fonte */}
            <button
              type="button"
              onClick={increaseFont}
              disabled={fontLevel >= 3}
              className="link-wrapper flex items-center justify-between text-left w-full hover:bg-gray-100 disabled:opacity-50"
            >
              <span className="text-sm">Aumentar Texto</span>
              <Plus size={18} />
            </button>

            {/* Diminuir fonte */}
            <button
              type="button"
              onClick={decreaseFont}
              disabled={fontLevel <= -1}
              className="link-wrapper flex items-center justify-between text-left w-full hover:bg-gray-100 disabled:opacity-50"
            >
              <span className="text-sm">Diminuir Texto</span>
              <Minus size={18} />
            </button>

            {/* Restaurar fonte */}
            <button
              type="button"
              onClick={resetFont}
              className="link-wrapper flex items-center justify-between text-left w-full hover:bg-gray-100"
            >
              <span className="text-sm">Tamanho Padrão</span>
              <RotateCcw size={16} />
            </button>

            {/* Links institucionais de acessibilidade */}
            <Link
              href="/acessibilidade/"
              onClick={() => setIsOpen(false)}
              className="link-wrapper flex items-center justify-between hover:bg-gray-100"
            >
              <span className="text-sm">Sobre Acessibilidade</span>
              <FileText size={16} />
            </Link>

            <Link
              href="/mapa-do-site/"
              onClick={() => setIsOpen(false)}
              className="link-wrapper flex items-center justify-between hover:bg-gray-100"
            >
              <span className="text-sm">Mapa do Site</span>
              <Compass size={16} />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
