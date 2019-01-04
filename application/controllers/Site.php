<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Site extends CI_Controller {

	
	public function index(){
        $data = array(
            'page_class' => 'homepage',
            'main_content' => 'pages/homepage_view'
        );
        $this->load->view('templates/template_view', array('data' =>$data));
    }
}
