<?php
    //print_r($_POST);
    if(empty($_POST["oculto"])
    || empty($_POST["txtNombres"])  
    || empty($_POST["txtA_Paterno"])
    || empty($_POST["txtA_Materno"])
    || empty($_POST["txtCod"]) 
    || empty($_POST["txtTurno"])
    || empty($_POST["txtA_ingreso"])
    || empty($_POST["txtA_egreso"])
    || empty($_POST["txtCarrera"]) 
    || empty($_POST["txtSemestre"])
    || empty($_POST["txtDomicilio"])
    || empty($_POST["txtTeléfono"])
    || empty($_POST["txtCorreo"])
    || empty($_POST["txtDNI"]))
    
    {
        header('Location: index.php?mensaje=falta');
        exit();
    }

    include_once 'model/conexion.php';
    
    $nombres = $_POST["txtNombres"];
    $apellido_paterno = $_POST["txtA_Paterno"];
    $apellido_materno = $_POST["txtA_Materno"];
    $cod_matrícula = $_POST["txtCod"];
    $turno = $_POST["txtTurno"];
    $año_ingreso = $_POST["txtA_ingreso"];
    $año_egreso = $_POST["txtA_egreso"];
    $carrera = $_POST["txtCarrera"];
    $semestre = $_POST["txtSemestre"];
    $domicilio = $_POST["txtDomicilio"];
    $teléfono = $_POST["txtTeléfono"];
    $correo = $_POST["txtCorreo"];
    $dni = $_POST["txtDNI"];
    
    $sentencia = $bd->prepare("INSERT INTO estudiante(
        nombres,
        apellido_paterno,
        apellido_materno,
        cod_matrícula,
        turno,
        año_ingreso,
        año_egreso,
        carrera,
        semestre,
        domicilio,
        teléfono,
        correo,
        dni
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);");
    $resultado = $sentencia->execute([
        
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
        $dni
    
        ]);

    if ($resultado === TRUE) {
        header('Location: index.php?mensaje=registrado');
    } else {
        header('Location: index.php?mensaje=error');
        exit();
    }
    
?>