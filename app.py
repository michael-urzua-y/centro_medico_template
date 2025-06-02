from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
from config.database import db, init_db
from models.user import Usuario

app = Flask(__name__)
app.config['SECRET_KEY'] = '1q2w3e4r5ta'

# Inicialización de la DB
init_db(app)

# Ruta principal que muestra el formulario
@app.route('/')
def index():
    return render_template('login_register.html')

# Ruta para procesar login
@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('loginEmail')
    password = request.form.get('loginPassword')
    
    user = Usuario.query.filter_by(email=email).first()
    
    if user and check_password_hash(user.password, password):
        flash('Inicio de sesión exitoso', 'success')
        return redirect(url_for('dashboard'))
    else:
        flash('Credenciales incorrectas', 'error')
        return redirect(url_for('index'))

# Ruta para procesar registro
@app.route('/register', methods=['POST'])
def register():
    nombre = request.form.get('registerNombre')
    email = request.form.get('registerEmail')
    password = request.form.get('registerPassword')
    rol = request.form.get('registerRol')
    
    try:
        if Usuario.query.filter_by(email=email).first():
            flash('Email ya registrado', 'error')
            return redirect(url_for('index'))
            
        nuevo_usuario = Usuario(
            nombre=nombre,
            email=email,
            password=password,
            rol=rol
        )
        
        db.session.add(nuevo_usuario)
        db.session.commit()
        flash('Registro exitoso! Por favor inicia sesión', 'success')
        
    except Exception as e:
        db.session.rollback()
        flash(f'Error: {str(e)}', 'error')
    
    return redirect(url_for('index'))

# Ruta del dashboard (protegida en una aplicación real)
@app.route('/dashboard')
def dashboard():
    return "Bienvenido al dashboard"

if __name__ == '__main__':
    app.run(debug=True)