<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Custom_404 extends CI_Controller {

	/*function __construct(){
        parent::__construct();
        $this->setlang->set_lang();
    }

    public function change_lang(){
        $choosen_lang = $this->uri->segment(3);
        if($choosen_lang == "es"){
            $data = array('lang' => $choosen_lang);
            $this->session->set_userdata($data);
            $this->lang->load('spanish', 'spanish');
            redirect($this->agent->referrer());
        }elseif(!$current_lang){
            $data = array('lang' => $choosen_lang);
            $this->session->set_userdata($data);
            $this->lang->load('english', 'english');
            redirect($this->agent->referrer());
        }
    }*/

	public function index(){
		/*$this->load->model('site_model');
		$even_odd = $this->site_model->even_odd();
		$this->load->library('geolocation');
		$query = $this->geolocation->get_location();*/
        $data = array(
            'page_class' => 'pageNotFound',
            'main_content' => 'pages/custom_404_view'
        );
        $this->load->view('templates/template_view', array('data' =>$data));
    }

}
