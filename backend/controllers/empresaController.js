const db = require('../db/db');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });