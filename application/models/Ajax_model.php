<?php

    class Ajax_model extends CI_Model {


        function get_makes(){
            $make_value = $this->input->post('make_value');
            $sql = "SELECT DISTINCT make FROM make_model WHERE make LIKE '$make_value%' ORDER BY make ASC";
        	$options = $this->db->query($sql);
        	if ($options->num_rows() > 0){
        		foreach($options->result() as $row){
        			$options_result[] = $row;
        		}
        		return $options_result;
        	}
        }

        function get_models(){
            $make_value = $this->input->post('make_value');
            $model_value = $this->input->post('model_value');
            $sql = "SELECT DISTINCT model FROM make_model WHERE make='$make_value' AND model LIKE '$model_value%' ORDER BY model ASC";
        	$options = $this->db->query($sql);
        	if ($options->num_rows() > 0){
        		foreach($options->result() as $row){
        			$options_result[] = $row;
        		}
        		return $options_result;
        	}
        }

    } 

?>
