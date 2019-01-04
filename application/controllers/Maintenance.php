<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Maintenance extends CI_Controller {

	function __construct(){
		parent::__construct();
		if(!$this->config->item('maintenance_mode')){
			redirect('site/index');
		}
    }

	public function index()
	{
		$this->load->view('pages/maintenance_view');
	}
}
