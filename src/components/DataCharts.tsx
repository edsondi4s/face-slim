import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const DataCharts = () => {
  const barData = {
    labels: ['Preenchedores', 'Bioestimuladores', 'Face Slim'],
    datasets: [
      {
        label: 'Meses de Duração',
        data: [12, 18, 120],
        backgroundColor: ['#e7e5e4', '#d6d3d1', '#c5a059'],
        borderRadius: 12,
        barThickness: 40,
      },
    ],
  };

  const lineData = {
    labels: ['Ano 1', 'Ano 3', 'Ano 5', 'Ano 7', 'Ano 10'],
    datasets: [
      {
        label: 'Injetáveis (Acúmulo)',
        data: [2, 5, 8, 11, 15],
        borderColor: '#d6d3d1',
        backgroundColor: '#d6d3d1',
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Face Slim',
        data: [0, 0, 0, 0, 0],
        borderColor: '#c5a059',
        backgroundColor: '#c5a059',
        borderWidth: 3,
        tension: 0,
        pointRadius: 6,
        pointBackgroundColor: '#c5a059',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 11,
            weight: 500 as const,
          },
          color: '#78716c',
        },
      },
      tooltip: {
        backgroundColor: '#1c1917',
        padding: 12,
        titleFont: { size: 14, family: "'Cormorant Garamond', serif" },
        bodyFont: { size: 12, family: "'Inter', sans-serif" },
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f5f5f4',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#a8a29e',
          font: { size: 10 }
        }
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#a8a29e',
          font: { size: 10 }
        }
      }
    },
  };

  return (
    <section id="dados" className="py-24 space-y-20">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-medium mb-6 text-stone-900">Eficácia em Perspectiva</h2>
        <p className="text-stone-500 text-lg font-light">
          A diferença entre tratar consequências temporárias e investir <br className="hidden md:block" />
          em uma restauração estrutural definitiva.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch px-4">
        <div className="bg-white premium-shadow rounded-[2.5rem] p-10 flex flex-col">
          <div className="mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-2 block">Longevidade</span>
            <h3 className="text-2xl font-medium text-stone-900">Durabilidade Comparada</h3>
            <p className="text-sm text-stone-400 mt-2 font-light">Expectativa de resultados visíveis em meses.</p>
          </div>
          <div className="h-[350px] w-full flex-grow">
            <Bar data={barData} options={{ ...options, plugins: { ...options.plugins, legend: { display: false } } }} />
          </div>
          <div className="mt-10 pt-6 border-t border-stone-50 flex items-center justify-between text-[11px] text-stone-400 uppercase tracking-widest font-bold">
            <span>Paliativo</span>
            <span>Definitivo</span>
          </div>
        </div>

        <div className="bg-white premium-shadow rounded-[2.5rem] p-10 flex flex-col">
          <div className="mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-2 block">Estabilidade</span>
            <h3 className="text-2xl font-medium text-stone-900">Manutenção de Volume</h3>
            <p className="text-sm text-stone-400 mt-2 font-light">Número de intervenções necessárias ao longo de 10 anos.</p>
          </div>
          <div className="h-[350px] w-full flex-grow">
            <Line data={lineData} options={options} />
          </div>
          <div className="mt-10 pt-6 border-t border-stone-50 flex items-center gap-4 text-[11px] text-stone-400 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-px bg-stone-300 border-dashed border-t" />
              <span>Ciclo de Retoques</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-px bg-brand-gold" />
              <span>Estabilidade Face Slim</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
