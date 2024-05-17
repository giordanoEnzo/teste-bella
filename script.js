document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let file = document.getElementById('pdfFile').files[0];

    let formData = new FormData();
    formData.append('nome_pdf', title);
    formData.append('arquivo_pdf', file);

    fetch('http://localhost:8000/administrador', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar PDF 1');
            }
            alert('PDF enviado com sucesso');
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar PDF 2');
        });
});
