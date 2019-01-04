<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ajax extends CI_Controller {
	
	public function makeSuggestions(){
	    $this->load->model('ajax_model');
        $makes_query = $this->ajax_model->get_makes();
        if($makes_query){
            $options = array();
            foreach($makes_query as $makes_query_row){
                array_push($options, $makes_query_row);
            }
            echo json_encode($options);
        }else{
            return FALSE;
        }
    }
    
    public function modelSuggestions(){
        $this->load->model('ajax_model');
        $models_query = $this->ajax_model->get_models();
        if($models_query){
            $options = array();
            foreach($models_query as $models_query_row){
                array_push($options, $models_query_row);
            }
            echo json_encode($options);
        }else{
            return FALSE;
        }
    }
}
