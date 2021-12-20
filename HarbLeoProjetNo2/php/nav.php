<?php

require_once("php/functions.php");

$failed = false;

if (isset($_POST['pseudo']) && isset($_POST['mdp'])) {
    $pseudo = filter_input(INPUT_POST, 'pseudo', FILTER_SANITIZE_STRING);
    $mdp = filter_input(INPUT_POST, 'mdp', FILTER_SANITIZE_STRING);
    if (!Login($pseudo, $mdp)) {
        $failed = true;
    }
}



session_start();
if (isset($_SESSION['pseudo'])) {
?>
    <div class="dropdown float-end mx-1">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <?php
            echo $_SESSION['pseudo'];
            ?>
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="index.php">Play</a></li>
            <li><a class="dropdown-item" href="scores.php">Best players</a></li>
            <li><a class="dropdown-item" href="userProfile.php">Profile</a></li>
            <li><a class="dropdown-item" href="logout.php">Logout</a></li>
        </ul>
    </div>
<?php
} else {
?>
    <button type="button" class="btn btn-light btn-lg float-end mx-1" data-bs-toggle="modal" data-bs-target="#login">
        Login
    </button>
    <button type="button" class="btn btn-light btn-lg float-end mx-1" data-bs-toggle="modal" data-bs-target="#register">
        Register
    </button>
<?php
}
?>
<div class="modal fade" id="login" tabindex="-1" aria-labelledby="enrollLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="enrollLabel">Login</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="lead">Login to an existing account</p>
                <form action="#" method="POST">
                    <div class="mb-3">
                        <label for="pseudo" class="col-form-label">Username:</label>
                        <input type="text" class="form-control" name="pseudo" id="pseudoLogin">
                    </div>
                    <div class="mb-3">
                        <label for="mdp" class="col-form-label">Password:</label>
                        <input type="password" class="form-control" name="mdp" id="mdpLogin">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-succes" data-bs-dismiss="modal">Close</button>
                        <input type="submit" value="Submit" class="btn btn-light">
                    </div>
                </form>
            </div>


        </div>
    </div>
</div>

<div class="modal fade" id="register" tabindex="-1" aria-labelledby="enrollLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="enrollLabel">Register</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="lead">Create a new account</p>
                <form action="createUser.php" method="POST">
                    <div class="mb-3">
                        <label for="pseudo" class="col-form-label">Username:</label>
                        <input type="text" class="form-control" name="pseudo" id="pseudoRegister">
                    </div>
                    <div class="mb-3">
                        <label for="mdp" class="col-form-label">Password:</label>
                        <input type="password" class="form-control" name="mdp" id="mdpRegister">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-succes" data-bs-dismiss="modal">Close</button>
                        <input type="submit" value="Submit" class="btn btn-light">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

<?php
if ($failed) {
?>
    <div class="modal fade" id="failedLogin" tabindex="-1" aria-labelledby="failedLoginLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="failedLoginLabel">Login error</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    The username or the password is incorrect. Please try again or create a new account.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            $("#failedLogin").modal("show");
        });
    </script>
<?php
}
?>