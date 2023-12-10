<?php include 'template/header.php' ?>

<style>
    body {
        background-image: url('img/gilda.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }

    .card{
        background-color: rgba(255, 255, 255, 0.8);
    }
</style>

<div class="container mt-5" >
    <div class="row justify-content-center">
        <div class="col-md-15" > <!-- Ajusta el tamaño del contenedor según tus necesidades -->
            <div class="card">
                <div class="card-header bg-warning">
                    <h3 class="display-6 fs-3"><strong>Ingresar datos:</strong></h3>
                </div>
                    <form class="p-4" method="POST" action="registrar.php">

                        <?php //INFORMACIÓN DEL ESTUDIANTE ?>

                        <fieldset>
                            <legend class="mt-1 mb-3"><strong>Información del estudiante</strong></legend>
                            <div class="row mb-3">  
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>DNI: </strong></label>
                                    <input type="number" class="form-control" name="txtDNI" autofocus required>
                                </div>
                                <div class="col-sm-4">
                                    <label class="form-label"><strong>Nombres: </strong></label>
                                    <input type="text" class="form-control" name="txtNombres" autofocus required>
                                </div>
                                <div class="col-sm-3">
                                    <label class="form-label"><strong>Apellido Paterno: </strong></label>
                                    <input type="text" class="form-control" name="txtA_Paterno" autofocus required>
                                </div>
                                <div class="col-sm-3">
                                    <label class="form-label"><strong>Apellido Materno: </strong></label>
                                    <input type="text" class="form-control" name="txtA_Materno" autofocus required>
                                </div>
                            </div>
                            <div class="row mb-3"> 
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Código de Matrícula: </strong></label>
                                    <input type="number" class="form-control" name="txtCod" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Turno: </strong></label>
                                    <input type="text" class="form-control" name="txtTurno" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Semestre: </strong></label>
                                    <input type="text" class="form-control" name="txtSemestre" autofocus required>
                                </div>
                                <div class="col-sm-6">
                                    <label class="form-label"><strong>Correo Electrónico: </strong></label>
                                    <input type="text" class="form-control" name="txtCorreo" autofocus required>
                                </div>
                            </div>
                            <div class="row mb-3"> 
                                <div class="col-sm-10">
                                    <label class="form-label"><strong>Domicilio: </strong></label>
                                    <input type="text" class="form-control" name="txtDomicilio" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Teléfono: </strong></label>
                                    <input type="number" class="form-control" name="txtTeléfono" autofocus required>
                                </div>
                            </div>
                            <div class="row mb-3"> 
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Año de Ingreso: </strong></label>
                                    <input type="int" class="form-control" name="txtA_ingreso" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Año de Egreso: </strong></label>
                                    <input type="int" class="form-control" name="txtA_egreso" autofocus required>
                                </div>
                                <div class="col-sm-8">
                                    <label class="form-label"><strong>Carrera Profesional: </strong></label>
                                    <input type="text" class="form-control" name="txtCarrera" autofocus required>
                                </div>
                            </div>
                                
                        </fieldset>

                        <?php //INFORMACIÓN DE LA EMPRESA ?>
                        <fieldset>
                            <legend class="mt-1 mb-3"><strong>Información de la Empresa</strong></legend>
                            <div class="row mb-3">
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>RUC: </strong></label>
                                    <input type="text" class="form-control" name="txtNombres" autofocus required>
                                </div>  
                                <div class="col-sm-10">
                                    <label class="form-label"><strong>Razón Social: </strong></label>
                                    <input type="number" class="form-control" name="txtDNI" autofocus required>
                                </div> 
                            </div>
                            <div class="row mb-3">  
                                <div class="col-sm-6">
                                    <label class="form-label"><strong>Dirección: </strong></label>
                                    <input type="text" class="form-control" name="txtA_Paterno" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Distrito: </strong></label>
                                    <input type="text" class="form-control" name="txtA_Materno" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Ciudad: </strong></label>
                                    <input type="number" class="form-control" name="txtCod" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Región: </strong></label>
                                    <input type="text" class="form-control" name="txtTurno" autofocus required>
                                </div>
                            </div>
                            <div class="row mb-3"> 
                                
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Teléfono: </strong></label>
                                    <input type="text" class="form-control" name="txtSemestre" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Fax: </strong></label>
                                    <input type="text" class="form-control" name="txtDomicilio" autofocus required>
                                </div>
                                <div class="col-sm-4">
                                    <label class="form-label"><strong>Correo Electrónico: </strong></label>
                                    <input type="text" class="form-control" name="txtCorreo" autofocus required>
                                </div>
                                <div class="col-sm-4">
                                    <label class="form-label"><strong>Página Web: </strong></label>
                                    <input type="number" class="form-control" name="txtTeléfono" autofocus required>
                                </div>
                            </div>
                            <div class="row mb-3">                                                          
                            </div>
                            <div class="row mb-3"> 
                                <div class="col-sm-4">
                                    <label class="form-label"><strong>Jefe de Empresa: </strong></label>
                                    <input type="int" class="form-control" name="txtA_ingreso" autofocus required>
                                </div>
                                <div class="col-sm-3">
                                    <label class="form-label"><strong>Cargo: </strong></label>
                                    <input type="int" class="form-control" name="txtA_egreso" autofocus required>
                                </div>
                                <div class="col-sm-5">
                                    <label class="form-label"><strong>Representante: </strong></label>
                                    <input type="text" class="form-control" name="txtCarrera" autofocus required>
                                </div>
                                <div class="col-sm-12">
                                    <label class="form-label"><strong>Rubro de la Empresa: </strong></label>
                                    <input type="text" class="form-control" name="txtCarrera" autofocus required>
                                </div>
                            </div>
                            
                        </fieldset>


                        <?php //INFORMACIÓN DE LAS PRÁCTICAS ?>

                        <fieldset>
                            <legend class="mt-1 mb-3"><strong>Prácticas Pre - Profesionales:</strong></legend>
                            <div class="row mb-3">
                                <div class="col-sm-1">
                                    <label class="form-label"><strong>Módulo: </strong></label>
                                    <input type="text" class="form-control" name="txtNombres" autofocus required>
                                </div>  
                                <div class="col-sm-11">
                                    <label class="form-label"><strong>Nombre del Módulo: </strong></label>
                                    <input type="number" class="form-control" name="txtDNI" autofocus required>
                                </div> 
                            </div>
                            <div class="row mb-3">  
                                <div class="col-sm-7">
                                    <label class="form-label"><strong>Tarea asignada: </strong></label>
                                    <input type="text" class="form-control" name="txtA_Paterno" autofocus required>
                                </div>
                                <div class="col-sm-1">
                                    <label class="form-label"><strong>Horas: </strong></label>
                                    <input type="text" class="form-control" name="txtA_Materno" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Fecha de Inicio: </strong></label>
                                    <input type="number" class="form-control" name="txtCod" autofocus required>
                                </div>
                                <div class="col-sm-2">
                                    <label class="form-label"><strong>Fecha de Término: </strong></label>
                                    <input type="text" class="form-control" name="txtTurno" autofocus required>
                                </div>
                            </div>
                            <div class="row mb-3"> 
                                
                                <div class="col-sm-1">
                                    <label class="form-label"><strong>Ingreso: </strong></label>
                                    <input type="text" class="form-control" name="txtSemestre" autofocus required>
                                </div>
                                <div class="col-sm-1">
                                    <label class="form-label"><strong>Salida: </strong></label>
                                    <input type="text" class="form-control" name="txtDomicilio" autofocus required>
                                </div>
                                <div class="col-sm-3">
                                    <label class="form-label"><strong>Días laborables: </strong></label>
                                    <input type="text" class="form-control" name="txtCorreo" autofocus required>
                                </div>
                                <div class="col-sm-7">
                                    <label class="form-label"><strong>Área de trabajo: </strong></label>
                                    <input type="number" class="form-control" name="txtTeléfono" autofocus required>
                                </div>
                            </div>
                            
                            <div class="row mb-3"> 
                                <div class="col-sm-6">
                                    <label class="form-label"><strong>Docente supervisor: </strong></label>
                                    <input type="int" class="form-control" name="txtA_ingreso" autofocus required>
                                </div>
                                <div class="col-sm-6">
                                    <label class="form-label"><strong>Supervisor de la Empresa: </strong></label>
                                    <input type="int" class="form-control" name="txtA_egreso" autofocus required>
                                </div>
                                                            
                            </div>
                            <div class="row mb-3"> 
                                <div class="col-sm-6">
                                    <label class="form-label"><strong>Coordinador académico: </strong></label>
                                    <input type="int" class="form-control" name="txtA_ingreso" autofocus required>
                                </div>
                                <div class="col-sm-6">
                                    <label class="form-label"><strong>Director: </strong></label>
                                    <input type="int" class="form-control" name="txtA_egreso" autofocus required>
                                </div>                             
                            </div>

                        </fieldset>
                            <div class="d-grid">
                                    <input type="hidden" name="oculto" value="1">
                                    <input type="submit" class="btn btn-primary" value="Registrar">
                            </div>
                    </form>
            </div>
        </div>
    </div>
</div>

<?php include 'template/footer.php' ?>