<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Resultados extends CI_Controller {
    
    public function busqueda($make, $model, $year){
        $data = array(
            'page_class' => 'results',
            'main_content' => 'pages/search_results_view',
            'make' => $make,
            'model' => $model,
            'year' => $year
        );
        $this->load->view('templates/template_view', array('data' =>$data));
    }
	
// 	public function makeSuggestions(){
// 	    $this->load->model('ajax_model');
//         $makes_query = $this->ajax_model->get_makes();
//         if($makes_query){
//             $options = array();
//             foreach($makes_query as $makes_query_row){
//                 array_push($options, $makes_query_row);
//             }
//             echo json_encode($options);
//         }else{
//             return FALSE;
//         }
//     }
    
}
