import { CLASES } from '../data/mockData.js';

export const notify = (message, type = 'info') =>
  window.dispatchEvent(new CustomEvent('sg:toast', { detail: { message, type } }));

export const printPage = () => window.print();

export const downloadCSV = (filename, rows) => {
  const csv = rows
    .map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\r\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
  notify('Archivo exportado correctamente', 'ok');
};

export function detectarSuperposicion(claseNueva, claseEditandoId = null) {
  const conflictos = [];
  const diasNueva = claseNueva.dias || [];
  if (!claseNueva.hora || !claseNueva.fin || diasNueva.length === 0) return conflictos;

  for (const otra of CLASES) {
    if (claseEditandoId && otra.id === claseEditandoId) continue;
    const diasOtra = otra.dias || [otra.dia];
    const diasComunes = diasNueva.filter(d => diasOtra.includes(d));
    if (!diasComunes.length || !(claseNueva.hora < otra.fin && otra.hora < claseNueva.fin)) continue;
    if (claseNueva.sala === otra.sala && claseNueva.sede === otra.sede) {
      conflictos.push({ tipo: 'Sala', con: otra, dias: diasComunes, recurso: `${otra.sala} (${otra.sede})` });
    }
    if (claseNueva.prof === otra.prof) {
      conflictos.push({ tipo: 'Profesor', con: otra, dias: diasComunes, recurso: otra.prof });
    }
  }
  return conflictos;
}
