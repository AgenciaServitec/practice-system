<?php 
    if(!isset($_GET['registro'])){
        header('Location: index.php?mensaje=error');
        exit();
    }

    include 'model/conexion.php';
     $registro = $_GET['registro'];

    $sentencia = $bd->prepare("DELETE FROM estudiante where registro = ?;");
    $resultado = $sentencia->execute([$registro]);

    if ($resultado === TRUE) {
        header('Location: index.php?mensaje=eliminado');
    } else {
        header('Location: index.php?mensaje=error');
    }
    
?>