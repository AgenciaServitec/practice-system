<?php 
    require_once 'vendor/autoload.php';
    
    // Verificar si se enviaron datos del formulario
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Obtener datos del formulario (puedes ajustar esto según tus necesidades)
        $datosFormulario = [
            'nombres' => $_POST['nombres'],
            'apellido_paterno' => $_POST['apellido_paterno'],
            'apellido_materno' => $_POST['apellido_materno'],
            'cod_matrícula' => $_POST['cod_matrícula'],
            'turno' => $_POST['turno'],
            'año_ingreso' => $_POST['año_ingreso'],
            'año_egreso' => $_POST['año_egreso'],
            'carrera' => $_POST['carrera'],
            'semestre' => $_POST['semestre'],
            'domicilio' => $_POST['domicilio'],
            'teléfono' => $_POST['teléfono'],
            'correo' => $_POST['correo'],
            'dni' => $_POST['dni']
            // Agrega más campos según sea necesario
        ];
    
        // Crear un nuevo objeto de PhpWord
        $phpWord = new \PhpOffice\PhpWord\PhpWord();
    
        // Cargar el documento Word existente
        $template = $phpWord->loadTemplate('C:\xampp\htdocs\crud\modulo1.docx');
    
        // Reemplazar marcadores en el documento con los datos del formulario
        foreach ($datosFormulario as $campo => $valor) {
            $template->setValue($campo, $valor);
        }
    
        // Guardar el documento Word generado (opcional)
        $rutaGeneradoDocx = 'C:\xampp\htdocs\crud\modulo1.docx';
        $template->save($rutaGeneradoDocx);
    
        // Crear un objeto mPDF para generar el PDF
        $mpdf = new \Mpdf\Mpdf();
    
        // Cargar el contenido del documento Word generado
        $content = file_get_contents($rutaGeneradoDocx);
    
        // Agregar el contenido al PDF
        $mpdf->WriteHTML($content);
    
        // Salida del PDF
        $mpdf->Output('ruta/del/archivo/generado.pdf', 'F');
    
        // Puedes redirigir al usuario a la página de descarga o mostrar algún mensaje
        // header('Location: ruta/del/archivo/generado.pdf');
        // exit();
    } else {
        // Manejar el caso en que no se hayan enviado datos del formulario
        echo 'Error: No se recibieron datos del formulario.';
    }
    
?>