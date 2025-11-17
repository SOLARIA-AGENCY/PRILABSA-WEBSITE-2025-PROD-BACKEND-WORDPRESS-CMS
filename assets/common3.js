const buttons = { "loading": "Carregando...", "error": "Erro", "success": "Sucesso", "cancel": "Cancelar", "confirm": "Confirmar", "save": "Salvar", "edit": "Editar", "delete": "Excluir", "back": "Voltar", "next": "Pr�ximo", "previous": "Anterior", "seeMore": "Ver mais", "viewAll": "Ver todos", "download": "Baixar", "contact": "Entre em Contato", "submit": "Enviar", "confirmSend": "Confirmar Envio", "downloadPdf": "Baixar PDF", "downloadCSS": "Baixar CSS", "exportCSS": "Exportar CSS", "subscribe": "INSCREVER-SE" };
const forms = { "fields": { "fullName": "Nome Completo", "name": "Nome completo *", "email": "E-mail *", "phone": "Telefone", "company": "Empresa *", "message": "Mensagem", "required": "* Campos obrigat�rios" }, "placeholders": { "email": "Seu endere�o de e-mail", "name": "Digite seu nome completo", "message": "Escreva sua mensagem aqui" }, "validation": { "required": "Por favor, preencha os campos obrigat�rios: Nome, E-mail e Mensagem.", "invalidEmail": "Por favor, digite um e-mail v�lido" }, "success": "Obrigado! Sua mensagem foi enviada. Entraremos em contato em breve.", "error": "Houve um erro ao enviar a mensagem. Por favor, tente novamente." };
const meta = { "loading": "Carregando...", "error": "Erro", "success": "Sucesso" };
const messages = { "simulationNote": "O envio de e-mail � apenas uma simula��o. Para receber cota��es reais, um backend deve ser integrado (SMTP, Brevo, SendGrid, etc).", "logoError": "N�o foi poss�vel carregar o logo para o PDF. O download ser� desabilitado.", "redirectMessage": "Voc� ser� redirecionado para o in�cio em breve." };
const contact = { "phone": "Telefone:", "email": "Para mais informa��es, escreva para", "title": "FALE CONOSCO" };
const newsletter = { "description": "Receba as �ltimas not�cias, ofertas e tend�ncias da ind�stria diretamente em seu e-mail.", "placeholder": "Seu endere�o de e-mail", "button": "INSCREVER-SE" };
const common = {
  buttons,
  forms,
  meta,
  messages,
  contact,
  newsletter
};
export {
  buttons,
  contact,
  common as default,
  forms,
  messages,
  meta,
  newsletter
};
