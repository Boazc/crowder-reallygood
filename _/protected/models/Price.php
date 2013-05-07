<?php

class Price extends Name
{
    const TYPE_ID = 3;
    /**
     * Returns the static model of the specified AR class.
     * @return NameCode the static model class
     */
    public static function model($className=__CLASS__)
    {
        return parent::model($className);
    }

    public function init()
    {
        parent::init();

        $this->code_type_id = self::TYPE_ID;
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */
    public function search()
    {
        // Warning: Please modify the following code to remove attributes that
        // should not be searched.

        $criteria=new CDbCriteria;
        $this->code_type_id = self::TYPE_ID;

        $criteria->compare('id',$this->id);
        $criteria->compare('code_type_id',$this->code_type_id);
        $criteria->compare('name',$this->name,true);
        $criteria->compare('desc',$this->desc,true);
        $criteria->compare('index_id',$this->index_id,true);
        $criteria->compare('is_active',$this->is_active);

        return new CActiveDataProvider($this, array(
            'criteria'=>$criteria,
            'sort' => array(
                'defaultOrder' => 'index_id  asc',
            ),
        ));
    }

    public  function getAll()
    {
        return $this->findAll(array(
            'condition' => 'code_type_id = :code_type_id AND is_active = 1',
            'params' => array(
                ':code_type_id' =>  self::TYPE_ID,
            ),
            'select' => 'name, id',
            'order' => 'index_id',
        ));

     }

}