const XLSX = require('xlsx');
const fs = require('fs');

class CriadorXLSX {
  constructor(nomeArquivo) {
    this.nomeArquivo = nomeArquivo || 'C:\\Users\\EDM\\Desktop\\Relatorio\\planilha.xlsx';
    this.dados = [];
  }

  adicionarDados(dados) {
    this.dados = dados;
  }

  criarXLSX() {
    const ws = XLSX.utils.json_to_sheet(this.dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Livro de actividades');

    XLSX.writeFile(wb, this.nomeArquivo, { bookSST: true, bookType: 'xlsx', type: 'binary' });
    console.log(`Arquivo ${this.nomeArquivo} criado com sucesso.`);
  }
}

module.exports = CriadorXLSX;
