<?php
    print_r($_POST);
    if(!isset($_POST['txtDNI'])){
        header('Location: index.php?mensaje=error');
    }

    include 'model/conexion.php';
        
         $nombres = $_POST['txtNombres'];
         $apellido_paterno = $_POST['txtA_Paterno'];
         $apellido_materno = $_POST['txtA_Materno'];
         $cod_matrícula = $_POST['txtCod'];
         $turno = $_POST['txtTurno'];
         $año_ingreso = $_POST['txtA_ingreso'];
         $año_egreso = $_POST['txtA_egreso'];
         $carrera = $_POST['txtCarrera'];
         $semestre = $_POST['txtSemestre'];
         $domicilio = $_POST['txtDomicilio'];
         $teléfono = $_POST['txtTeléfono'];
         $correo = $_POST['txtCorreo'];
         $dni = $_POST['txtDNI'];
         $registro = $_POST['registro'];

    $sentencia = $bd->prepare("UPDATE estudiante SET 
            
            dni = ?,
            nombres = ?,
            apellido_paterno = ?,
            apellido_materno = ?,
            cod_matrícula = ?, 
            turno = ?, 
            año_ingreso = ?,
            año_egreso = ?,
            carrera = ?,
            semestre = ?,
            domicilio = ?,
            teléfono = ?,
            correo = ?
            
            where registro = ?;");

    $resultado = $sentencia->execute([

            $dni,            
            $nombres,
            $apellido_paterno, 
            $apellido_materno, 
            $cod_matrícula, 
            $turno, 
            $año_ingreso,
            $año_egreso,
            $carrera,
            $semestre,
            $domicilio,
            $teléfono,
            $correo, 
            $registro]);

    if ($resultado === TRUE) {
        header('Location: index.php?mensaje=editado');
    } else {
        header('Location: index.php?mensaje=error');
        exit();
    }
    
?>