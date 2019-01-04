<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Buscar extends CI_Controller {
	
// 	function __construct(){
//         parent::__construct();
// 	}
	
	public function index(){
	    $make = str_replace(' ', '-', $this->input->post('make'));
        $model = str_replace(' ', '-', $this->input->post('model'));
        $year = $this->input->post('year');
        $path = 'http://13.58.84.133/resultados/busqueda/'.$make.'/'.$model.'/'.$year;
        //echo $path;
        redirect($path, 'location', 301);
	}
    
	
}
