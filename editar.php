<?php include 'template/header.php' ?>

<?php
    if(!isset($_GET['registro'])){
        header('Location: index.php?mensaje=error');
        exit();
    }

    include_once 'model/conexion.php';
    $registro = $_GET['registro'];

    $sentencia = $bd->prepare("select * from estudiante where registro = ?;");
    $sentencia->execute([$registro]);
    $estudiante = $sentencia->fetch(PDO::FETCH_OBJ);
    //print_r($persona);
?>

<div class="container mt-5 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    Editar datos:
                </div>
                <form class="p-4" method="POST" action="editarProceso.php">
                    
                    <div class="mb-3">
                        <label class="form-label">DNI: </label>
                        <input type="text" class="form-control" name="txtDNI" required 
                        value="<?php echo $estudiante->dni; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nombres: </label>
                        <input type="text" class="form-control" name="txtNombres" required 
                        value="<?php echo $estudiante->nombres; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Apellido Paterno: </label>
                        <input type="text" class="form-control" name="txtA_Paterno" required 
                        value="<?php echo $estudiante->apellido_paterno; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Apellido Materno: </label>
                        <input type="text" class="form-control" name="txtA_Materno" required 
                        value="<?php echo $estudiante->apellido_materno; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Código de Matrícula: </label>
                        <input type="number" class="form-control" name="txtCod" autofocus required
                        value="<?php echo $estudiante->cod_matrícula; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Turno: </label>
                        <input type="text" class="form-control" name="txtTurno" autofocus required
                        value="<?php echo $estudiante->turno; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Año de Ingreso: </label>
                        <input type="number" class="form-control" name="txtA_ingreso" autofocus required
                        value="<?php echo $estudiante->año_ingreso; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Año de Egreso: </label>
                        <input type="number" class="form-control" name="txtA_egreso" autofocus required
                        value="<?php echo $estudiante->año_egreso; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Carrera: </label>
                        <input type="text" class="form-control" name="txtCarrera" autofocus required
                        value="<?php echo $estudiante->carrera; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Semestre: </label>
                        <input type="text" class="form-control" name="txtSemestre" required 
                        value="<?php echo $estudiante->semestre; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Domicilio: </label>
                        <input type="text" class="form-control" name="txtDomicilio" required 
                        value="<?php echo $estudiante->domicilio; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Teléfono: </label>
                        <input type="number" class="form-control" name="txtTeléfono" required 
                        value="<?php echo $estudiante->teléfono; ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Correo Electrónico: </label>
                        <input type="email" class="form-control" name="txtCorreo" required 
                        value="<?php echo $estudiante->correo; ?>">
                    </div>
                    <div class="d-grid">
                        <input type="hidden" name="registro" value="<?php echo $estudiante->registro; ?>">
                        <input type="submit" class="btn btn-primary" value="GUARDAR">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include 'template/footer.php' ?>